import {EntityViewModel} from '../entity-view-model';
import {inject} from 'aurelia-dependency-injection';
import {EmployeeService} from './employee-service';

var missingPhoto = 'iVBORw0KGgoAAAANSUhEUgAAAIAAAACABAMAAAAxEHz4AAAAMFBMVEXFxcX19fX+/v7x8fHu7u7p6enl5eXh4eHc3NzZ2dnV1dXR0dHNzc3Jycn5+fnGxsbcfiHzAAACQ0lEQVR4Xu2Yz0obURTGxz+Nf2IyIcvSlswNmaixQxG6LIpLRRB9geAThO4KpUieQNy4kxBfQNoXCF103dJ9SWfTUiiOeQARXHhwvHf8zhfIxvnt8+Ny5nzn3BvvyZCTk5OTUzo9ePX77YfvrOBbbG6JPlIC/5O5409C/L5rBPNXbzgz9/inFfw0KXZ1gqU4LQh03+KzeUBLI1gwFnrEAdgjlIyNCK/ClbGyAQu27IIGWULhAhRcuwQVUNB1CVbAGBkXERapOePkCBJMuwVDLgfCGiQ4dAuakCB2CwIyCAISh/kswTEgKGQJOoBgNkuwCQimRMCloZwlGHKNKNQAwYgQECegazCJrzAzbh88yxK0J5GFJSSN/DxA2HcLQmImEgt6NO5ULgDzhB2KiQfx3iVY9gSqCJegYJ7rQ8FftwvqHsovu+C/CLg4DDyYvk2w6uHMkV0knHAXJKFIVkD4kRa89HT4qX4OE6Xg3KTYJn8vPCdeXLThi7Gy400ojcWqSxD0iCBA3Yjvxj0gyutZgvoA62E379iZLm8/7gDCi2yBX31MEAy4C5LwhlvtQgOchdyG/SoC6uFUihFBlABXRLKMXUywTHahkDhzCNLWXc/wLRmjggAehbrhWMYFFWAj64vgx7ggIksgHHOjQKhwSRRec7NECOEg4HFY0Al63CwQNtErOv6I7usELe4jCCGXZSEAvyL+hl3UCi7sbz2cDhYlfDlMawU1LIt4HvtaQQvbaviV8VAraGL/huMXlapOIM/YGwKj/drs5x+/AAAAAElFTkSuQmCC';

@inject(EmployeeService)
export class Employee extends EntityViewModel {
  constructor(service) {
    super(service);
  }

  get photo() {
    return 'data:image/png;base64,' + (this.entity.Photo || missingPhoto);
  }

  get title() {
    if (this.entity.FirstName || this.entity.LastName) {
      return `${this.entity.FirstName} ${this.entity.LastName}`;
    }
    return 'Employee';
  }
}
