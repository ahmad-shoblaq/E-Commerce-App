import {
    Model,
    ProjectionType,
    QueryOptions,
    QueryFilter,
    UpdateQuery,
} from 'mongoose';

export class AbstractRepository<T> {
    constructor(private readonly model: Model<T>) {}

    public async create(item: Partial<T>) {
        const doc = new this.model(item);
        return doc.save();
    }

    public async getOne(
        filter: QueryFilter<T>,
        projection: ProjectionType<T> = {},
        options: QueryOptions = {},
    ) {
        return this.model.findOne(filter, projection, options);
    }

    public async getAll(
        filter: QueryFilter<T>,
        projection: ProjectionType<T> = {},
        options: QueryOptions = {},
    ) {
        return this.model.find(filter, projection, options);
    }

    public async updateOne(
        filter: QueryFilter<T>,
        update: UpdateQuery<T> = {},
        options: QueryOptions = {},
    ) {
        return this.model.findOneAndUpdate(filter, update, options);
    }

    public async deleteOne(filter: QueryFilter<T>) {
        return this.model.findOneAndDelete(filter);
    }
}
