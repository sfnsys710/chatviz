'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function SettingsDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Settings</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>ChatViz Settings</DialogTitle>
                    <DialogDescription>Tweak the settings to your liking.</DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    <section className="space-y-3">
                        <h4 className="text-sm font-medium">Model</h4>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a model" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Anthropic</SelectLabel>
                                    <SelectItem value="claude-opus-4-7">Claude Opus 4.7</SelectItem>
                                    <SelectItem value="claude-sonnet-4-6">Claude Sonnet 4.6</SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>OpenAI</SelectLabel>
                                    <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                                    <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>Qwen</SelectLabel>
                                    <SelectItem value="qwen-max">Qwen Max</SelectItem>
                                    <SelectItem value="qwen-2-5">Qwen 2.5</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </section>

                    <Separator />

                    <section className="space-y-4">
                        <h4 className="text-sm font-medium">LLM Settings</h4>
                        <div className="space-y-2">
                            <span className="text-sm">Temperature</span>
                            <Slider defaultValue={[0.7]} max={1} step={0.01} />
                        </div>
                        <div className="space-y-2">
                            <span className="text-sm">Top P</span>
                            <Slider defaultValue={[0.9]} max={1} step={0.01} />
                        </div>
                        <div className="space-y-2">
                            <span className="text-sm">Max Length</span>
                            <Slider defaultValue={[2048]} max={8192} step={1} />
                        </div>
                    </section>

                    <Separator />

                    <section className="space-y-3">
                        <h4 className="text-sm font-medium">RAG Settings</h4>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Query decomposition</span>
                            <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Query expansion</span>
                            <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Reranking</span>
                            <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Hybrid search</span>
                            <Switch />
                        </div>
                    </section>
                </div>
            </DialogContent>
        </Dialog>
    )
}
