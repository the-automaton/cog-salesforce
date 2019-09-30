import { BaseStep, Field, StepInterface } from '../core/base-step';
import { Step, RunStepResponse, FieldDefinition, StepDefinition } from '../proto/cog_pb';

export class ContactCreateStep extends BaseStep implements StepInterface {

  protected stepName: string = 'Create a Salesforce Contact';
  protected stepExpression: string = 'create a salesforce contact';
  protected stepType: StepDefinition.Type = StepDefinition.Type.ACTION;
  protected expectedFields: Field[] = [{
    field: 'contact',
    type: FieldDefinition.Type.MAP,
    description: 'A map of field names to field values',
  }];

  async executeStep(step: Step): Promise<RunStepResponse> {
    const stepData: any = step.getData().toJavaScript();
    const contact: any = stepData.contact;

    try {
      const result = await this.client.createContact(contact);
      return this.pass('Successfully created Contact with ID %s', [result.id]);
    } catch (e) {
      return this.error('There was a problem creating the Contact: %s', [e.toString()]);
    }
  }

}

export { ContactCreateStep as Step };
