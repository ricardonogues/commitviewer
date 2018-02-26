import { schema } from 'normalizr';

// Define commit schema
const Commit = new schema.Entity('commits', {}, { idAttribute: 'uuid' });

// Define a change schema
const Comparison = new schema.Entity('comparisons', { commits: [Commit] }, { idAttribute: 'id' });

export default Comparison;