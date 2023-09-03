import CvHeader from './cvHeader';
import CvWorkExprience from './CvWorkExprience';
import ExposureIcon from '@mui/icons-material/Exposure';
import CvContact from './CvContact';
import CvEducation from './CvEducation';
import CvQualifications from './CvQualifications';
import {Button, Card, CardContent, Checkbox, FormControlLabel, FormGroup} from '@mui/material';
import {CvSateController, CvState} from "./slice-CV.ts";
import {useUnwrap} from "../../utils/hooks.ts";

const Row = (props: {children: React.ReactNode}) => <div>{props.children}</div>;
export function CvPage() {
  const cvFilters = useUnwrap(CvState);

  return (
    <Row>
      <Card>
        <h4>Filters</h4>
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
      </Card>

      <Card style={{maxWidth: 1000, margin: 25}}>
        <CardContent>
          <Button variant="contained">Default</Button>
          <ExposureIcon />
          <CvHeader />
          <CvContact />
          <CvWorkExprience />
          <CvEducation />
          <CvQualifications />
        </CardContent>
      </Card>
    </Row>
  );
}
