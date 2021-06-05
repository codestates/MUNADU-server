import {
  Model,
  AllowNull,
  AutoIncrement,
  Column,
  NotEmpty,
  PrimaryKey,
  Table,
  HasMany,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import Martials from "./Martials";
import Reviews_Replies from "./Reviews_Replies";
import Users from "./Users";

export interface ReviewsI {
  id?: number | null;
  period: number;
  comment: string;
  score: number;
  practicality: number;
  muscle: number;
  difficulty: number;
  intensity: number;
  injury: number;
}

@Table({
  tableName: "Reviews",
  timestamps: true,
})
export default class Reviews extends Model implements ReviewsI {
  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  period!: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  comment!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  score!: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  practicality!: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  muscle!: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  difficulty!: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  intensity!: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  injury!: number;

  @HasMany(() => Reviews_Replies)
  reviews_replies!: Reviews_Replies[];

  @ForeignKey(() => Martials)
  @Column({ onDelete: "cascade" })
  Martials_id!: number;

  @ForeignKey(() => Users)
  @Column({ onDelete: "cascade" })
  Users_id!: number;

  @BelongsTo(() => Martials)
  martials!: Martials;

  @BelongsTo(() => Users)
  users!: Users;
}
