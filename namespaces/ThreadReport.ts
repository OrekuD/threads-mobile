namespace ThreadReport {
  export enum State {
    TYPE_1 = 1,
    TYPE_2 = 2,
    TYPE_3 = 3,
    TYPE_4 = 4,
    TYPE_5 = 5,
    TYPE_6 = 6,
    TYPE_7 = 7,
    TYPE_8 = 8,
    TYPE_9 = 9,
    TYPE_10 = 10,
    TYPE_11 = 11,
    TYPE_12 = 12,
  }

  const TEXT: Record<State, string> = {
    [State.TYPE_1]: "I just don't like it",
    [State.TYPE_2]: "It's spam",
    [State.TYPE_3]: "Nudity or sexual activity",
    [State.TYPE_4]: "Hate speech or symbols",
    [State.TYPE_5]: "Bullying or harassment",
    [State.TYPE_6]: "False information",
    [State.TYPE_7]: "Scam or fraud",
    [State.TYPE_8]: "Violence or dangerous organisations",
    [State.TYPE_9]: "Suicide or self-injury",
    [State.TYPE_10]: "Intellectual property violation",
    [State.TYPE_11]: "Sale of illegal or regulated goods",
    [State.TYPE_12]: "Eating disorders",
  };

  export const list = () =>
    Object.values(State).filter((item) => typeof item !== "string") as State[];

  export const text = (state: State) => TEXT[state];
}

export default ThreadReport;
