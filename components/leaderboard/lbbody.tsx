import { useEffect, useState } from "react";
import { collection, onSnapshot, DocumentData } from "firebase/firestore";
import { db } from "@/firebase/main";
import { ArrowRight, Search } from "react-feather";
import styled from "styled-components";
import Header from "../ui/navbar";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface LeaderBoard {
  id: string;
  user_id: string;
  latest_points: string;
  last_updated: string;
}

export function LeaderboardBody() {
  const [videos, setVideos] = useState<LeaderBoard[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Leaderboard"),
      (snapshot) => {
        const videoList: LeaderBoard[] = [];
        const tagSet: Set<string> = new Set();

        snapshot.forEach((doc) => {
          const data = doc.data() as DocumentData;
          const video: LeaderBoard = {
            id: doc.id,
            user_id: data.user_id,
            latest_points: data.latest_points,
            last_updated: data.last_updated,
          };
          videoList.push(video);

          data.vid_tags.forEach((tag: string) => {
            tagSet.add(tag);
          });
        });

        setVideos(videoList);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <LBMain className="flex flex-1 flex-col items-center">
      <Header />
      <div className={cn("pb-[200px] pt-4 flex-1 md:pt-10")}>
        <div className="flex flex-row items-center gap-1 overflow-visible rounded-lg bg-white py-2 px-2 pl-2.5 pr-4 focus-within:ring-primary ring-1 ring-zinc-200 focus-within:shadow-input focus-within:shadow-primary/10 shadow-md transition-shadow">
          <input
            className="text-base min-w-[15rem] text-zinc-800 font-medium pl-1 caret-primary grow-1 peer w-full outline-none"
            type={"text"}
            name="input"
            required
            placeholder="Enter your Search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <span className="icon">{<Search />}</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="grid w-full grid-cols-1 gap-4">
            {videos.map((video) => (
              <div
                key={video.id}
                className="md:rounded-xl border-y-2 md:border-2 border-zinc-100 md:bg-gradient-to-b from-white from-50% to-gray-100/60 flex items-center p-8 md:p-8 justify-between gap-8 cursor-pointer"
              >
                <h2 className="text-balance">{video.user_id}</h2>
                <h2 className="text-balance">{video.latest_points}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <InputBox
        input={input}
        setInput={setInput}
        onSubmit={(value: string) => {
          // Implement your message submission logic here
        }}
        isLoading={isLoading}
      /> */}
    </LBMain>
  );
}

const LBMain = styled.section`
  h2 {
    font-weight: 600;
    font-size: 1.125rem;
    line-height: 1.75rem;
  }

  .midField {
    width: 90%;
    form {
      font-size: 0.8rem;
      margin-top: 1.5em;
      h3 {
        font-size: 0.9rem;
        cursor: pointer;
        font-weight: 700;

        &:hover {
          text-decoration: underline;
        }
      }
      .name {
        margin-bottom: 1.2rem;
        p {
          font-size: 18;
          font-weight: 500;
          margin-bottom: 8px;
          color: #4a5568;
        }
        .icon {
          color: #4a5568;
          cursor: pointer;
          svg {
            width: 24px;
          }
        }
      }
      .sub {
        margin-top: 0.8rem;
        button {
          font-weight: 700;
          color: #e8e8e8;
          background-color: #101727;
          border-radius: 10px;
        }
        p {
          margin-top: 2em;
          color: red;
        }
      }
    }
  }

  .lfmfooter {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
    p {
      font-size: 0.9rem;

      span {
        font-size: 0.9rem;
        cursor: pointer;
        font-weight: 700;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;
