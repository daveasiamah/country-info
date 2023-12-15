const Title = ({ text }: { text: string }) => (
  <h2 className="font-bold text-3xl">{text}</h2>
);

const Subtitle = ({ text }: { text: string }) => (
  <h2 className="font-bold text-2xl">{text}</h2>
);

export { Title, Subtitle };
