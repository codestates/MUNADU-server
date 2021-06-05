import {
  Model,
  AllowNull,
  AutoIncrement,
  Column,
  NotEmpty,
  PrimaryKey,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Reviews from "./Reviews";
import Users from "./Users";

export interface Reviews_RepliesI {
  id?: number | null;
  comment: string;
}

@Table({
  tableName: "Reviews_Replies",
  timestamps: true,
})
export default class Reviews_Replies extends Model implements Reviews_RepliesI {
  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  comment!: string;

  @ForeignKey(() => Users)
  @Column({ onDelete: "cascade" })
  Users_id!: number;

  @BelongsTo(() => Users)
  users!: Users;

  @ForeignKey(() => Reviews)
  @Column({ onDelete: "cascade" })
  Reviews_id!: number;

  @BelongsTo(() => Reviews)
  reviews!: Reviews;
}
