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

const FAKE_CHATS = [
    { id: '1', title: 'Sales by region last quarter' },
    { id: '2', title: 'Top products by revenue' },
    { id: '3', title: 'Customer satisfaction trends' },
    { id: '4', title: 'Widget A vs Widget B' },
    { id: '5', title: 'Monthly revenue breakdown' },
];

export default function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <h3 className="px-2 text-lg font-semibold">ChatViz</h3>
                <Button>+ New Chat</Button>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>History</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {FAKE_CHATS.map(chat => (
                                <SidebarMenuItem key={chat.id}>
                                    <SidebarMenuButton>{chat.title}</SidebarMenuButton>
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
