System.register(['moment'], function (_export) {
  'use strict';

  var moment, DateFormatValueConverter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_moment) {
      moment = _moment['default'];
    }],
    execute: function () {
      DateFormatValueConverter = (function () {
        function DateFormatValueConverter() {
          _classCallCheck(this, DateFormatValueConverter);
        }

        _createClass(DateFormatValueConverter, [{
          key: 'toView',
          value: function toView(value, format) {
            if (value === null) return '';
            return moment(value).format(format);
          }
        }, {
          key: 'fromView',
          value: function fromView(value, format) {
            if (value === '') return null;
            return moment.parse(value, format).toDate();
          }
        }]);

        return DateFormatValueConverter;
      })();

      _export('DateFormatValueConverter', DateFormatValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy9kYXRlLWZvcm1hdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Y0FFYSx3QkFBd0I7Ozs7Ozs7Ozs7O0FBQXhCLDhCQUF3QjtpQkFBeEIsd0JBQXdCO2dDQUF4Qix3QkFBd0I7OztxQkFBeEIsd0JBQXdCOztpQkFDN0IsZ0JBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRTtBQUNwQixnQkFBSSxLQUFLLEtBQUssSUFBSSxFQUNoQixPQUFPLEVBQUUsQ0FBQztBQUNaLG1CQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7V0FDckM7OztpQkFFTyxrQkFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFO0FBQ3RCLGdCQUFJLEtBQUssS0FBSyxFQUFFLEVBQ2QsT0FBTyxJQUFJLENBQUM7QUFDZCxtQkFBTyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztXQUM3Qzs7O2VBWFUsd0JBQXdCOzs7MENBQXhCLHdCQUF3QiIsImZpbGUiOiJyZXNvdXJjZXMvZGF0ZS1mb3JtYXQuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9