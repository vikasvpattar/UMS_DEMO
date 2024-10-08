import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { AWS_URL_GENERATOR } from "../utils/apiConstants";

export const getFileUrl = async (
  referenceType,
  referenceId,
  fileExtension,
  setLoading,
  file
) => {
  if (file?.size > 5242880)
    return toast.error("File size should not exceed 5MB");
  var url;
  setLoading(1);
  if (file?.size > 5242880) setLoading(0);
  const config = {
    method: "post",
    url: AWS_URL_GENERATOR,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
    },
    data: {
      referenceId: referenceId,
      fileExtension: fileExtension,
      referenceType: referenceType,
      fileType: file.type,
    },
  };

  await axios(config)
    .then(async (res) => {
      const config2 = {
        method: "put",
        url: res.data.url,
        headers: {
          "Content-Type": file.type,
        },
        data: file,
      };

      await axios(config2)
        .then((res2) => {
          setLoading(0);
          console.log(res2);
          if (res2.status === 200 || res2.status === 201) {
            url = res.data.url.split("?")[0];
            console.log(url);
            toast.success(
              "Image or Document uploaded complete application for final submission"
            );
          } else
            return new Error(`Error returned with status code ${res.status}`);
        })
        .catch((err) => {
          setLoading(0);

          console.log(err);
          // console.log('here');
          toast.error("Error while handling Attachement");
          throw new Error("Something Went Wrong");
        });
    })
    .catch((err) => {
      setLoading(0);
      console.log(err);
      throw new Error("Something Went Wrong");
    });

  return url;
};
