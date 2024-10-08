import React, { useState } from "react";
import Bed from "../ApplicationForms/Bed";
import Bsc from "../ApplicationForms/Bsc";
import Commerce from "../ApplicationForms/Commerce";
import Homeopathy from "../ApplicationForms/Homeopathy";
import Law from "../ApplicationForms/Law";
import Msc from "../ApplicationForms/Msc";
import NursingBsc from "../ApplicationForms/NursingBsc";
import NursingGnm from "../ApplicationForms/NursingGnm";
import NursingMsc from "../ApplicationForms/NursingMsc";
import NursingPostBasic from "../ApplicationForms/NursingPostBasic";
import VedicAstro from "../ApplicationForms/VedicAstro";
import AyurvedaPg from "../ApplicationForms/AyurvedaPg";
import PBBscNursing from "../ApplicationForms/PBBscNursing";
import MscNursing from "../ApplicationForms/MscNursing";
import UGPharmacy from "../ApplicationForms/UGPharmacy";
import PGPharmacy from "../ApplicationForms/PGPharmacy";

const StudentCollegeDetails = ({ application, form_data }) => {
  console.log(form_data);
  return (
    <div className="StudentCollegeDetails mt-3 px-3">
      {application === "Law" && <Law form_data={form_data} />}
      {application === "Commerce" && <Commerce form_data={form_data} />}
      {application === "Bsc" && <Bsc form_data={form_data} />}
      {application === "Bed" && <Bed form_data={form_data} />}
      {application === "Msc" && <Msc form_data={form_data} />}
      {application === "Vedic" && <VedicAstro form_data={form_data} />}
      {application === "Nursing Bsc" && <NursingBsc form_data={form_data} />}
      {application === "Nursing GNM" && <NursingGnm form_data={form_data} />}
      {application === "Nursing Msc" && <MscNursing form_data={form_data} />}
      {application === "Nursing Post Basic" && (
        <PBBscNursing form_data={form_data} />
      )}
      {application === "Homeopathy" && <Homeopathy form_data={form_data} />}
      {application === "Ayurveda" && <Homeopathy form_data={form_data} />}

      {application === "AyurvedaPG" && <AyurvedaPg form_data={form_data} />}
      {application === "UGPharmacy" && <UGPharmacy form_data={form_data} />}
      {application === "PGPharmacy" && <PGPharmacy form_data={form_data} />}
    </div>
  );
};

export default StudentCollegeDetails;
