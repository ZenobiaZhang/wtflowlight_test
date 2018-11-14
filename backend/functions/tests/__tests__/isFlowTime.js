const Database = require('../../database/database')
const Team = Database.Team
const moment = require('moment')
moment.tz.setDefault("America/New_York")

test('Not flow time for same day start/end', () => {
  let time = moment("14:00", "HH:mm");
  let team = new Team("Test Team", "Test Space", "11:00", "13:00");
  expect(team.isFlowTime(time)).toBe(false);
});

test('Valid flow time for different days start/end', () => {
  let time = moment("01:00", "HH:mm").add(1,'d')
  console.log(time)
  let team = new Team("Test Team", "Test Space", "23:00", "02:00");
  expect(team.isFlowTime(time)).toBe(true);
});

test('Invalid flow time for same day start/end', () => {
  let time = moment("11:00", "HH:mm");
  let team = new Team("Test Team", "Test Space", "20:00", "05:00");
  expect(team.isFlowTime(time)).toBe(false);
});

test('wrapping days flow time', () => {
  let time = moment("00:05", "HH:mm");
  let team = new Team("Test Team", "Test Space", "23:00", "01:00");
  expect(team.isFlowTime(time)).toBe(true);
});

test("now after flow start with wrapping flow end", () => {
  let time = moment("23:15", "HH:mm");
  let team = new Team("Test Team", "Test Space", "23:00", "01:00");
  expect(team.isFlowTime(time)).toBe(true);
});

test("now before flow start with wrapping flow end", () => {
  let time = moment("10:00", "HH:mm");
  let team = new Team("Test Team", "Test Space", "23:00", "01:00");
  expect(team.isFlowTime(time)).toBe(false);
});

test("now after flow end with same day flow start/end", () => {
  let time = moment("13:00", "HH:mm");
  let team = new Team("Test Team", "Test Space", "08:00", "10:00");
  expect(team.isFlowTime(time)).toBe(false);
});

test("now between flow start/end with wrapping flow end", () => {
  let time = moment("13:00", "HH:mm");
  let team = new Team("Test Team", "Test Space", "01:00", "00:05");
  expect(team.isFlowTime(time)).toBe(true);
});

test("now between flow start/end with wrapping flow end", () => {
  let time = moment("13:00", "HH:mm");
  let team = new Team("Test Team", "Test Space", "01:00", "00:05");
  expect(team.isFlowTime(time)).toBe(true);
});

test("now equal to flow start with same day flow start/end", () => {
  let time = moment("12:00", "HH:mm");
  let team = new Team("Test Team", "Test Space", "12:00", "18:00");
  expect(team.isFlowTime(time)).toBe(true);
});

test("now equal to flow end with same day flow start/end", () => {
  let time = moment("18:00", "HH:mm");
  let team = new Team("Test Team", "Test Space", "12:00", "18:00");
  expect(team.isFlowTime(time)).toBe(false);
});

test("now equal to flow end with wrapping flow end", () => {
  let time = moment("12:00", "HH:mm");
  let team = new Team("Test Team", "Test Space", "18:00", "12:00");
  expect(team.isFlowTime(time)).toBe(false);
});

test("now equal to flow start with wrapping flow end", () => {
  let time = moment("18:00", "HH:mm");
  let team = new Team("Test Team", "Test Space", "18:00", "12:00");
  expect(team.isFlowTime(time)).toBe(true);
});
