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
import Martials from "./Martials";
import Users from "./Users";

export interface CommentsI {
  id?: number | null;
  comment: string;
}

@Table({
  tableName: "Comments",
  timestamps: true,
})
export default class Comments extends Model implements CommentsI {
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

  @ForeignKey(() => Martials)
  @Column({ onDelete: "cascade" })
  Martials_id!: number;

  @BelongsTo(() => Martials)
  martials!: Martials;
}
