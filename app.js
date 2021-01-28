var app = new Vue({
  el: "#app",
  data: {
    drinkName: "",
    drinks: [
      {
        name: "Tea",
        brew: 6,
        path: "teapot.svg",
        records: [],
      },
      {
        name: "Coffee",
        brew: 1,
        path: "coffeepot.svg",
        records: [],
      },
    ],
  },
  methods: {
    addDrink: function () {
      let oldRecord = false;
      this.drinks.push({
        name: this.drinkName,
        brew: 1,
        path: "teapot.svg",
        records: [],
      });
    },
    format: function (timeStamp) {
      const date = new Date(timeStamp);
      return [
        date.getHours(),
        (date.getMinutes() < 10 ? "0" : "") + date.getMinutes(),
        (date.getSeconds() < 10 ? "0" : "") + date.getSeconds(),
      ].join(":");
    },
    addRecord: function (drink) {
      drink.records.map((record) => {
        record.isLineThrough = true;
      });

      const time = new Date();
      const start = time.valueOf();
      time.setMilliseconds(time.getMilliseconds() + drink.brew * 1000);
      const end = time.valueOf();
      const isFinished = false;
      const isLineThrough = false;
      drink.records.push({
        start,
        end,
        isFinished,
        isLineThrough,
      });
    },
    btnDisabled: function (drink) {
      const lastRecord = drink.records[drink.records.length - 1];
      if (lastRecord && !lastRecord.isFinished) {
        return true;
      }
    },
    clearRecord: function (drink) {
      drink.records = drink.records.filter(
        (record) => record.isFinished == false
      );
    },
    clearRecords: function () {
      this.drinks.map((drink) => {
        drink.records = drink.records.filter(
          (record) => record.isFinished == false
        );
      });
    },
  },
  created() {
    setInterval(() => {
      this.drinks.map((drink) => {
        drink.records.map((record) => {
          if (!record.isFinished && record.end <= Date.now()) {
            record.isFinished = true;
          }
        });
      });
    }, 1000);
  },
});
