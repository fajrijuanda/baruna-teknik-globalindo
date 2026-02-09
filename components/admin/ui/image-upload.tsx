"use client";

import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Link as LinkIcon, Trash, Upload } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const [urlInput, setUrlInput] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // Avoid hydration mismatch
    }

    const convertImageToDataUrl = async (file: File): Promise<string> => {
        if (file.type.includes("svg") || file.type.includes("gif")) {
            return await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(String(reader.result));
                reader.onerror = () => reject(new Error("Failed to read image file"));
                reader.readAsDataURL(file);
            });
        }

        const imageBitmap = await createImageBitmap(file);
        const maxWidth = 1600;
        const ratio = Math.min(1, maxWidth / imageBitmap.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(imageBitmap.width * ratio));
        canvas.height = Math.max(1, Math.round(imageBitmap.height * ratio));

        const context = canvas.getContext("2d");
        if (!context) throw new Error("Failed to process image.");

        context.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL("image/webp", 0.82);
    };

    const handleChooseFile = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("File harus berupa gambar.");
            event.target.value = "";
            return;
        }

        try {
            setIsProcessing(true);
            const dataUrl = await convertImageToDataUrl(file);
            onChange(dataUrl);
            toast.success("Gambar berhasil dipilih dari device.");
        } catch {
            toast.error("Gagal memproses gambar.");
        } finally {
            setIsProcessing(false);
            event.target.value = "";
        }
    };

    const handleAddFromUrl = () => {
        const trimmedUrl = urlInput.trim();
        if (!trimmedUrl) {
            toast.error("Masukkan URL gambar terlebih dahulu.");
            return;
        }

        onChange(trimmedUrl);
        setUrlInput("");
    };

    return (
        <div className="space-y-4">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={disabled || isProcessing}
            />

            <div className="flex flex-wrap items-center gap-4">
                {value.map((url) => (
                    <div key={url} className="relative h-[180px] w-[180px] overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                        <div className="z-10 absolute top-2 right-2">
                            <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="icon" disabled={disabled || isProcessing}>
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={url}
                        />
                    </div>
                ))}
            </div>

            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50/60 p-4">
                <div className="flex flex-wrap gap-3">
                    <Button
                        type="button"
                        disabled={disabled || isProcessing}
                        variant="secondary"
                        onClick={handleChooseFile}
                    >
                        <Upload className="mr-2 h-4 w-4" />
                        {isProcessing ? "Processing..." : "Pilih dari Device"}
                    </Button>
                    <Button
                        type="button"
                        disabled={disabled || isProcessing}
                        variant="outline"
                        onClick={handleChooseFile}
                    >
                        <ImagePlus className="mr-2 h-4 w-4" />
                        Ganti Gambar
                    </Button>
                </div>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <Input
                        value={urlInput}
                        onChange={(event) => setUrlInput(event.target.value)}
                        placeholder="atau tempel URL gambar..."
                        disabled={disabled || isProcessing}
                    />
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleAddFromUrl}
                        disabled={disabled || isProcessing}
                    >
                        <LinkIcon className="mr-2 h-4 w-4" />
                        Pakai URL
                    </Button>
                </div>
            </div>
        </div>
    );
}
