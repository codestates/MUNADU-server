import {
  Model,
  AllowNull,
  AutoIncrement,
  Column,
  NotEmpty,
  PrimaryKey,
  Table,
  HasMany,
  BelongsToMany,
} from "sequelize-typescript";
import Comments from "./Comments";
import Reviews from "./Reviews";
import Users from "./Users";
import Users_Martials from "./Users_Martials";

export interface MartialsI {
  id?: number | null;
  name: string;
  weapon: number;
  uniform: number;
  origin: number;
  sports: number;
  manner: number;
  attack: number;
  nation: string;
  caption: string;
  video: string;
  kcal: number;
  img: string;
  wiki: string;
}

@Table({
  tableName: "Martials",
  timestamps: true,
})
export default class Martials extends Model implements MartialsI {
  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  name!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  weapon!: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  uniform!: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  origin!: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  sports!: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  manner!: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  attack!: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  nation!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  caption!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  video!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  kcal!: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  img!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  wiki!: string;

  @HasMany(() => Comments)
  comments!: Comments[];

  @HasMany(() => Reviews)
  reviews!: Reviews[];

  @BelongsToMany(() => Users, () => Users_Martials)
  users!: Users[];
}

//User - Review
//Review_repelies - martial
