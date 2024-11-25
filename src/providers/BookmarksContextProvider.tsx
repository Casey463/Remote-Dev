import React, { useEffect, useState } from "react";

type BookmarksContextProviderProps = {
  children: React.ReactNode;
};

type BookmarksContext = {
  bookmarkedIds: number[];
  handleToggleBookmark: (id: number) => void;
};

export const BookmarksContext = React.createContext<BookmarksContext | null>(
  null
);

export default function BookmarksContextProvider({
  children,
}: BookmarksContextProviderProps) {
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(() =>
    JSON.parse(localStorage.getItem("bookmarkedIds") || "[]")
  );
  
  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((id) => id !== id));
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
    }
  };

  useEffect(() => {
    localStorage.setItem("bookmarkedIds", JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  return (
    <BookmarksContext.Provider value={{ bookmarkedIds, handleToggleBookmark }}>
      {children}
    </BookmarksContext.Provider>
  );
}
