import { api } from "@/trpc/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Parser from "rss-parser";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";

const Rss = (props: {
  data: Parser.Output<{
    [key: string]: any;
  }>;
  id: string;
}) => {
  const [data, setData] = useState(props.data);

  const rssReq = api.util.fetchRss.useQuery(
    { id: props.id },
    {
      refetchInterval: 1000 * 60 * 5,
    },
  );

  useEffect(() => {
    if (rssReq.data) {
      setData((data) => {
        return {
          ...data,
          ...rssReq.data,
        };
      });
    }
  }, [rssReq.data]);

  if (rssReq.isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-10 w-full"></Skeleton>
        <Skeleton className="h-10 w-full"></Skeleton>
        <Skeleton className="h-10 w-full"></Skeleton>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <ScrollArea className="h-full">
        {data.items.map((item) => {
          return (
            <div
              key={item.guid}
              className="border-b p-2 hover:bg-background/50"
            >
              <Link href={item.link ?? ""} target="_blank">
                <div className="leading-1 py-1 text-sm font-medium">
                  {item.title}
                </div>
              </Link>
            </div>
          );
        })}
      </ScrollArea>
    </div>
  );
};

export default Rss;
