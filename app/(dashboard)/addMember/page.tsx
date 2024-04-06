import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginForm() {
  return (
    <Card className="w-full max-w-sm ">
      <CardHeader>
        <CardTitle className="text-2xl">Add Member</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="name" placeholder="john doe" required />
        </div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="johndoe@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="role">Role</Label>
          <Input id="role" type="role" placeholder="software engineer" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="task">Task</Label>
          <Input id="task" type="task" placeholder="design dashboard" required />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Add</Button>
      </CardFooter>
    </Card>
  )
}