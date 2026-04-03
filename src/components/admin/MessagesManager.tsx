import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ContactMessage, useMessages } from "@/hooks/useMessages";
import { Eye, Loader2, Mail, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function formatDate(value?: string) {
  if (!value) return "Just now";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString();
}

const MessagesManager = () => {
  const { messages, loading, error, refresh } = useMessages();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const query = searchQuery.trim().toLowerCase();
  const filteredMessages = !query
    ? messages
    : messages.filter((message) =>
        [message.name, message.email, message.message].some((value) =>
          value.toLowerCase().includes(query),
        ),
      );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-destructive py-8">
        <p>Failed to load messages.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Contact Messages</h2>
          <p className="text-sm text-muted-foreground">
            Review inquiries from clients and recruiters.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages..."
              className="pl-9 w-full sm:w-[260px]"
            />
          </div>
          <Button variant="outline" onClick={refresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {messages.filter((message) => message.status === "new").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Latest Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {messages[0] ? formatDate(messages[0].created_at) : "No messages yet"}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Inbox
          </CardTitle>
          <CardDescription>
            Messages are stored in Firestore and mirrored to email through your contact flow.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredMessages.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Received</TableHead>
                  <TableHead className="text-right">Preview</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell className="font-medium">{message.name}</TableCell>
                    <TableCell>
                      <a
                        href={`mailto:${message.email}`}
                        className="text-primary hover:underline"
                      >
                        {message.email}
                      </a>
                    </TableCell>
                    <TableCell className="max-w-[420px]">
                      <p className="line-clamp-3 whitespace-pre-wrap text-sm text-muted-foreground">
                        {message.message}
                      </p>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {message.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatDate(message.created_at)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedMessage(message)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              <p>
                {searchQuery
                  ? `No messages found for "${searchQuery}".`
                  : "No contact messages yet."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={!!selectedMessage}
        onOpenChange={(open) => !open && setSelectedMessage(null)}
      >
        <DialogContent className="max-w-3xl">
          {selectedMessage && (
            <>
              <DialogHeader>
                <DialogTitle>Email Preview</DialogTitle>
                <DialogDescription>
                  Preview how this inquiry reads before you reply.
                </DialogDescription>
              </DialogHeader>

              <div className="rounded-xl border bg-card/40 overflow-hidden">
                <div className="border-b bg-muted/40 px-6 py-4">
                  <p className="text-sm text-muted-foreground">From</p>
                  <p className="font-medium">{selectedMessage.name}</p>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {selectedMessage.email}
                  </a>
                </div>

                <div className="px-6 py-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Subject</p>
                      <p className="font-medium">
                        New portfolio inquiry from {selectedMessage.name}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(selectedMessage.created_at)}
                    </div>
                  </div>

                  <div className="rounded-lg border bg-background/70 p-4">
                    <p className="text-sm text-muted-foreground mb-2">Message</p>
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessagesManager;
