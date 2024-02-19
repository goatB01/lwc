import { LightningElement, api, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DragAndDropCard extends NavigationMixin(LightningElement) {
    @api stage;
    @api record;
    @api opportunityId;
    @track isExpanded = false;
    @track isDropdownOpen = false;

    get isSameStage() {
        return this.stage === this.record.StageName;
    }

    navigateOppHandler(event) {
        event.preventDefault();
        this.navigateHandler(event.target.dataset.id, 'Opportunity');
    }

    navigateAccHandler(event) {
        event.preventDefault();
        this.navigateHandler(event.target.dataset.id, 'Account');
    }

    navigateHandler(Id, apiName) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: Id,
                objectApiName: apiName,
                actionName: 'view',
            },
        });
    }

    itemDragStart() {
        const event = new CustomEvent('itemdrag', {
            detail: this.record.Id,
        });
        this.dispatchEvent(event);
    }

    toggleCard() {
        if (this.isDropdownOpen ) {
            this.isDropdownOpen = false;
        }
        this.isExpanded = !this.isExpanded;
        
    }

    handleCardClick(event) {
        if (!event.target.classList.contains('dropdown-trigger')) {
            this.toggleCard();
        }
    }    

    handleEdit(event) {
        event.preventDefault();
        this.showToast('Edit Clicked');
    }

    handleDelete(event) {
        event.preventDefault();
        this.showToast('Delete Clicked');
    }

    showToast(message) {
        const toastEvent = new ShowToastEvent({
            title: 'Success',
            message: message,
            variant: 'success',
        });
        this.dispatchEvent(toastEvent);
    }
    toggleDropdown(event) {
        event.stopPropagation();
        if (!this.isExpanded) {
        this.isExpanded = true;}
        this.isDropdownOpen = !this.isDropdownOpen;
        
    }
}
