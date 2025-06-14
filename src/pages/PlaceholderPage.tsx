import React from 'react';

interface Props {
  title: string;
}

export default function PlaceholderPage({ title }: Props) {
  return <div className="text-xl">{title} Page</div>;
}
