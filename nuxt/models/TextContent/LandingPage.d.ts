export type HeaderTeaser = {
  header: string;
  tagLines: string;
  textBlocks: {
    left: {
      header: string;
      list: string[];
    };
    right: {
      header: string;
      body: string;
    }
  }
};

export type BiddingsCalendar = {
  header: string;
  body: string;
}
