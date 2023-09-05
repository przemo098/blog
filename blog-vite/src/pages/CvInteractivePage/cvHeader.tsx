import {CvFilters} from "./Components/cvFilters.tsx";
import {Button} from "@mui/material";
import {CvSateController} from "./slice-CV.ts";

export default function CvHeader() {
  return (
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
      <CvFilters/>
      <div className="cv-header">
        <h1 style={{marginBottom: 0}}>Curriculum Vitae</h1>
      </div>
      <div>
        <Button variant="contained" onClick={() => CvSateController.resetFilters()}>Default</Button>
      </div>
    </div>
  );
}
