import { api } from "@/trpc/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const RssForm = (props: { onSuccess?: () => void }) => {
  const form = useForm({
    defaultValues: {
      url: "",
      name: "",
    },
  });

  const createComponentMutation = api.component.create.useMutation({
    onSuccess() {
      toast.success("Component created successfully");
      props.onSuccess?.();
    },
    onError(error) {
      toast.error(error.message);
    },
    onMutate() {
      toast.loading("Creating component...");
    },
    onSettled() {
      toast.dismiss();
    },
  });

  return (
    <Form {...form}>
      <DialogHeader>
        <DialogTitle>RSS</DialogTitle>
        <DialogDescription>
          Add an RSS feed to your page to embed another website.
        </DialogDescription>
      </DialogHeader>
      <FormField
        control={form.control}
        name="name"
        rules={{
          required: "Name is required",
        }}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field}></Input>
              </FormControl>
              <FormDescription>The name of the RSS feed.</FormDescription>
              <FormMessage></FormMessage>
            </FormItem>
          );
        }}
      />
      <FormField
        control={form.control}
        name="url"
        rules={{
          required: "URL is required",
          pattern: {
            value: /^https?:\/\//,
            message: "URL must start with http:// or https://",
          },
        }}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input {...field}></Input>
              </FormControl>
              <FormDescription>The URL of the RSS feed.</FormDescription>
              <FormMessage></FormMessage>
            </FormItem>
          );
        }}
      />
      <DialogFooter>
        <Button
          disabled={createComponentMutation.isPending}
          onClick={() => {
            const { name, ...rest } = form.getValues();
            createComponentMutation.mutate({
              type: "rss",
              data: {
                ...rest,
              },
              name,
            });
          }}
        >
          Create
        </Button>
      </DialogFooter>
    </Form>
  );
};

export default RssForm;
