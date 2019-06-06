const queryString = require('query-string');
const decoder = (props: any) => {
    const { location } = props;
    if (location) {
        const values = queryString.parse(location.search);
        return values;
    }
    return null
}
export default decoder
