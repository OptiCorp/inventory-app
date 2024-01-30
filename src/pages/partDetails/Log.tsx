import { Item } from '../../services/apiTypes';
import { format } from 'date-fns';
import { ScrollTextField } from './styles';

export const Log = ({ item }: { item: Item }) => {
    const sortedLogEntries = item.logEntries.sort((a, b) => {
        const sortedA = new Date(a.createdDate).valueOf();
        const sortedB = new Date(b.createdDate).valueOf();
        return sortedB - sortedA;
    });
    const formattedLogEntries = sortedLogEntries
        .map((entry) => {
            const fullName = `${entry.createdBy.firstName} ${entry.createdBy.lastName}`;
            return `${format(new Date(entry.createdDate), 'dd.MM.yyyy').toString()}: ${
                entry.message
            } by user ${fullName}`;
        })
        .join('\n');

    return (
        <>
            <h4>Log</h4>
            <ScrollTextField
                value={formattedLogEntries.length < 1 ? 'No log entries' : formattedLogEntries}
                multiline
                variant="filled"
                disabled
            />
        </>
    );
};
