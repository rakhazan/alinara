"use client";
import Button from "./button";
import { InputGroup } from "./input-group";
export function QuantityInput({ value, onValueChange, min = 1, max = 99, label = "jumlah" }: { value: number; onValueChange: (value: number) => void; min?: number; max?: number; label?: string }) { return <InputGroup role="group" aria-label={label} className="w-fit"><Button variant="ghost" size="icon" disabled={value <= min} aria-label={`Kurangi ${label}`} onClick={() => onValueChange(value - 1)}>−</Button><output aria-live="polite" className="min-w-10 text-center text-sm">{value}</output><Button variant="ghost" size="icon" disabled={value >= max} aria-label={`Tambah ${label}`} onClick={() => onValueChange(value + 1)}>+</Button></InputGroup>; }
