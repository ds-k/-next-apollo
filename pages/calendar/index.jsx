import { useCalendar } from "@h6s/calendar";
import dayjs from "dayjs";
import "dayjs/locale/ko";

export default function Calendar() {
  const { headers, body, view } = useCalendar();

  return (
    <div className="flex flex-col items-center">
      <table>
        <thead>
          <tr>
            {headers.weekDays.map(({ key, value }) => {
              return (
                <th key={key}>{dayjs(value).locale("ko").format("ddd")}</th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {body.value.map(({ key, value: days }) => (
            <tr key={key}>
              {days.map(({ key, value }) => (
                <td key={key}>{dayjs(value).format("D")}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
