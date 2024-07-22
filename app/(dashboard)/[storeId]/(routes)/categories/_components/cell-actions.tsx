"use client";

import axios from "axios";

import { CategoryColumn } from "./columns";

type Props = {
  data: CategoryColumn;
};

export const CellActionComponent: React.FC<Props> = ({ data }) => {
  return (
    <>
      <div>Cell Action</div>
    </>
  );
};
