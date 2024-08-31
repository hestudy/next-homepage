import Parser from "rss-parser";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";

const Rss = (props: {
  data: Parser.Output<{
    [key: string]: any;
  }>;
}) => {
  return (
    <div className="relative h-full">
      <ScrollArea className="h-full">
        {props.data.items.map((item) => {
          return (
            <div key={item.guid}>
              <Link href={item.link ?? ""} target="_blank">
                <div className="border-b py-2 text-base">{item.title}</div>
              </Link>
            </div>
          );
        })}
      </ScrollArea>
    </div>
  );
};

export default Rss;
