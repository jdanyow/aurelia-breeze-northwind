System.register(["breeze"], function (_export) {
  "use strict";

  var breeze, host, serviceName, Orders;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [function (_breeze) {
      breeze = _breeze["default"];
    }],
    execute: function () {
      host = "http://sampleservice.breezejs.com";
      serviceName = host + "/api/northwind";

      Orders = (function () {
        function Orders() {
          _classCallCheck(this, Orders);

          this.orders = [];
          this.pageSize = 100;
          this.pageCount = 0;
          this.pageIndex = 0;
          this.isLoading = false;
        }

        _createClass(Orders, [{
          key: "activate",
          value: function activate() {
            this.loadPage();
          }
        }, {
          key: "loadPage",
          value: function loadPage() {
            var _this = this;

            this.orders = [];
            this.isLoading = true;

            var query = new breeze.EntityQuery.from("Orders").select("OrderID, Customer.CompanyName, Employee.FirstName, Employee.LastName, OrderDate, Freight").orderByDesc("OrderDate").skip(this.pageIndex * this.pageSize).take(this.pageSize).inlineCount();

            return new breeze.EntityManager(serviceName).executeQuery(query).then(function (queryResult) {
              _this.orders = queryResult.results;
              _this.pageCount = Math.ceil(queryResult.inlineCount / _this.pageSize);
              _this.pageCount = 8;
              _this.isLoading = false;
            });
          }
        }, {
          key: "setPage",
          value: function setPage(index) {
            this.pageIndex = index;
            this.loadPage();
          }
        }]);

        return Orders;
      })();

      _export("Orders", Orders);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Y0FNSSxJQUFJLEVBQ0osV0FBVyxFQUVGLE1BQU07Ozs7Ozs7Ozs7O0FBSGYsVUFBSSxHQUFHLG1DQUFtQztBQUMxQyxpQkFBVyxHQUFHLElBQUksR0FBRyxnQkFBZ0I7O0FBRTVCLFlBQU07aUJBQU4sTUFBTTtnQ0FBTixNQUFNOztlQUNqQixNQUFNLEdBQUcsRUFBRTtlQUNYLFFBQVEsR0FBRyxHQUFHO2VBQ2QsU0FBUyxHQUFHLENBQUM7ZUFDYixTQUFTLEdBQUcsQ0FBQztlQUNiLFNBQVMsR0FBRyxLQUFLOzs7cUJBTE4sTUFBTTs7aUJBT1Qsb0JBQUc7QUFDVCxnQkFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1dBQ2pCOzs7aUJBRU8sb0JBQUc7OztBQUNULGdCQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNqQixnQkFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7O0FBRXRCLGdCQUFJLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUM5QyxNQUFNLENBQUMsMEZBQTBGLENBQUMsQ0FDbEcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQ25CLFdBQVcsRUFBRSxDQUFDOztBQUVqQixtQkFBTyxJQUFJLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQ3pDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FDbkIsSUFBSSxDQUFDLFVBQUEsV0FBVyxFQUFJO0FBQ25CLG9CQUFLLE1BQU0sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDO0FBQ2xDLG9CQUFLLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEdBQUcsTUFBSyxRQUFRLENBQUMsQ0FBQztBQUNwRSxvQkFBSyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0FBQ25CLG9CQUFLLFNBQVMsR0FBRyxLQUFLLENBQUM7YUFDeEIsQ0FBQyxDQUFDO1dBQ047OztpQkFFTSxpQkFBQyxLQUFLLEVBQUU7QUFDYixnQkFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7QUFDdkIsZ0JBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztXQUNqQjs7O2VBbkNVLE1BQU07Ozt3QkFBTixNQUFNIiwiZmlsZSI6Im9yZGVycy5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=