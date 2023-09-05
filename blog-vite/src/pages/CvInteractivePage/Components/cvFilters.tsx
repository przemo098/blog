import {Card, Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import {CvSateController, CvState} from "../slice-CV.ts";
import {useUnwrap} from "../../../utils/hooks.ts";

export function CvFilters(){
  const cvFilters = useUnwrap(CvState);

  return (
    <Card>
      <h4 style={{margin: 0}}>Filters</h4>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={cvFilters?.isFeSelected}
              onChange={() => CvSateController.switchFeFilter()}
              name="checkedB"
              color="primary"
            />
          }
          label="Frontend"
        />
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={cvFilters?.isBeSelected}
              onChange={() => CvSateController.switchBeFilter()}
              name="checkedB"
              color="primary"
            />
          }
          label="Backend"
        />
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={cvFilters?.isDevOpsSelected}
              onChange={() => CvSateController.switchDevOpsFilter()}
              name="checkedB"
              color="primary"
            />
          }
          label="Devops"
        />
      </FormGroup>
    </Card>)
}
