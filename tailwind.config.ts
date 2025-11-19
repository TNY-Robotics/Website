import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default <Partial<Config>>{
    plugins: [require('@tailwindcss/typography')],
}
