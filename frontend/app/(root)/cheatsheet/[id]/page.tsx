"use client";

import { useParams } from "next/navigation";
import React from "react";

const CheatSheetDetails = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default CheatSheetDetails;
