export class DateHelper {
  public static getCurrentDate() {
    return DateHelper.toDateOnly(new Date());
  }

  public static compareDates(firstDate: Date, secondDate: Date): number {
    const firstDateOnly = DateHelper.toDateOnly(firstDate);
    const secondDateOnly = DateHelper.toDateOnly(secondDate);

    if (firstDateOnly < secondDateOnly) return -1;
    if (firstDateOnly > secondDateOnly) return 1;

    return 0;
  }

  public static toDateOnly(date: Date): Date {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0,
      0,
      0,
      0
    );
  }
}
