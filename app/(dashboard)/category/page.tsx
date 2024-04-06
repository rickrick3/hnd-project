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
        <CardTitle className="text-2xl">Add Category</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Category Name</Label>
          <Input id="name" type="name" placeholder="Education" required />
        </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Add</Button>
      </CardFooter>
    </Card>
  )
}