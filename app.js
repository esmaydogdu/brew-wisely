var json = {
  Tea: { brew: 3000, path: "teapot.svg" },
  Coffee: { brew: 5000, path: "coffeepot.svg" },
};
var app = new Vue({
  el: "#app",
  data: {
    drinkName: "ihlamur",
    drinks: [
      {
        name: "Tea",
        brew: 6000,
        path: "teapot.svg",
        records: [],
      },
      {
        name: "Coffee",
        brew: 1000,
        path: "coffeepot.svg",
        records: [],
      },
    ],
  },
  methods: {
    addDrink: function () {
      this.drinks.push({
        name: this.drinkName,
        brew: 1000,
        path: "teapot.svg",
        records: [],
      });
    },
    format: function (timeStamp) {
      const date = new Date(timeStamp);
      return [date.getHours(), date.getMinutes(), date.getSeconds()].join(":");
    },
    addRecord: function (drink) {
      const time = new Date();
      const start = time.valueOf();
      time.setMilliseconds(time.getMilliseconds() + drink.brew);
      const end = time.valueOf();
      const isFinished = false;
      drink.records.push({
        start,
        end,
        isFinished,
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

  //bi de backend ile mail atacagız içecekler hazır oldugunda
  //eklenen içeceği silmek

  //++TODO1: yeni bi record false'tan true'ya dönene kadar buton disabled olsun.
  //TODO2: yeni bir record true oldugunda eski kayıtlara class eklensin.
  //TODO3:sil butonları var: filter ile sileceksin çünkü isfinished true olanları sileceğiz
  //TODO4: brew time inputlarını saniye olarak alıp, içeride düzenlemek
});
