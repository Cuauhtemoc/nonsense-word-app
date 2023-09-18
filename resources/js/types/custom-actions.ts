import { ChonkyIconName, FileData, defineFileAction } from "@aperturerobotics/chonky";

export const CreateNewList  = defineFileAction({
    id: 'create_new_list',
    button: {
        name: 'Create new list',
        toolbar: true,
        contextMenu: true,
        group: "Actions", 
        icon: ChonkyIconName.file
    },
} as const);

export const EditList  = defineFileAction({
    id: 'edit_list',
    requiresSelection: true,
    button: {
        name: 'Edit list',
        toolbar: true,
        contextMenu: true,
        group: "Actions", 
        icon: ChonkyIconName.file
    },
} as const);
export const CreatePDF  = defineFileAction({
    id: 'create_pdf',
    button: {
        name: 'Create PDF',
        toolbar: true,
        contextMenu: true,
        group: "Actions", 
        icon: ChonkyIconName.file
    },
} as const);
export const CopyShareableLink  = defineFileAction({
    id: 'copy_shareable_link',
    requiresSelection: true,
    button: {
        name: 'Copy shareable link',
        toolbar: true,
        contextMenu: true,
        group: "Actions", 
        icon: ChonkyIconName.copy
    },
} as const);