import { LightningElement, wire, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getTaskList from '@salesforce/apex/KanBanController.getTaskList';

export default class TasksList extends NavigationMixin(LightningElement) {
    @api opportunityId;
    @track tasks = [];
    @track error;

    @wire(getTaskList, { opportunityId: '$opportunityId' })
    wiredTasks({ error, data }) {
        if (data) {
            this.tasks = data;
        } else if (error) {
            this.error = error;
            console.error('Error fetching tasks:', this.error);
        }
    }

    handleTaskClick(event) {
        event.preventDefault();
        const taskId = event.target.dataset.recordId;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: taskId,
                objectApiName: 'Task',
                actionName: 'view',
            },
        });
    }
}
