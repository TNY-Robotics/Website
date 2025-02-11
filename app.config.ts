export default defineAppConfig({
    ui: {
        primary: 'orange',
        gray: 'slate',
        input: {
            default: {
                color: 'gray',
            }
        },
        select: {
            default: {
                color: 'gray',
            }
        },
        modal: {
            background: 'bg-slate-50 dark:bg-slate-700',
            overlay: {
                background: 'bg-slate-200/75 dark:bg-slate-800/75'
            }
        },
        button: {
            rounded: 'rounded-lg',
            variant: {
                solid: 'border-orange-700 mt-0 border-b-4 hover:border-b-2 hover:mt-0.5'
            }
        }
    }
});