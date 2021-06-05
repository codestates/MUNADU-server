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
import Martials from "./Martials";
import Reviews from "./Reviews";
import Reviews_Replies from "./Reviews_Replies";
import Users_Martials from "./Users_Martials";

export interface UsersI {
  id?: number | null;
  name: string;
  password: string;
  email: string;
  img: string;
  address: string;
}

@Table({
  tableName: "Users",
  timestamps: true,
})
export default class Users extends Model implements UsersI {
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
  password!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  salt!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  email!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  img!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  address!: string;

  @HasMany(() => Comments)
  comments!: Comments[];

  @HasMany(() => Reviews)
  reviews!: Reviews[];

  @HasMany(() => Reviews_Replies)
  reviews_replies!: Reviews_Replies[];

  @BelongsToMany(() => Martials, () => Users_Martials)
  martials!: Martials[];
}
