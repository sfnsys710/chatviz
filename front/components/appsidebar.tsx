'use client'

import { Button } from "@/components/ui/button";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import SettingsDialog from "@/components/settingsdialog";
import { Chat } from "@/lib/types";

type Props = {
    chats: Chat[]
    activeChatId: string | null
    onNewChat: () => void
    onSelectChat: (id: string) => void
}

export default function AppSidebar({ chats, activeChatId, onNewChat, onSelectChat }: Props) {
    return (
        <Sidebar>
            <SidebarHeader>
                <h3 className="px-2 text-lg font-semibold">ChatViz</h3>
                <Button onClick={onNewChat}>+ New Chat</Button>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>History</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {chats.map(chat => (
                                <SidebarMenuItem key={chat.id}>
                                    <SidebarMenuButton onClick={() => onSelectChat(chat.id)} isActive={chat.id === activeChatId}>{chat.title}</SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SettingsDialog />
            </SidebarFooter>
        </Sidebar>
    );
}
