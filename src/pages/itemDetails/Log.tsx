import { format } from 'date-fns';
import { Item } from '../../services/apiTypes';
import { ScrollTextField } from './styles';

export const Log = ({ item }: { item: Item }) => {
    if (!item?.logEntries) {
        return (
            <div>
                <h4>Log</h4>No log entries
            </div>
        );
    }
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
                InputProps={{ sx: { borderRadius: 0 } }}
                value={formattedLogEntries}
                multiline
                variant="filled"
                disabled
            />
        </>
    );
};
