var app = angular.module("site");

app.controller("ClanController",
 ['$scope', 'UglyService', 'TermIndexService', 'AttributeService',
  function($scope, UglyService, TermIndexService, AttributeService) {

    var ctrl = this;
    ctrl.clanDescriptions = [];
    ctrl.clanPage = "./clanpage.html";

    ctrl.filterClans = filterClans;

    ctrl.clanFilters = [
      "All", "Thirteen", "Camarilla", "Sabbat", "Independent", "All Clans",
      "All Bloodlines", "Camarilla (clans only)", "Sabbat (clans only)",
      "Dark Ages", "High Clans", "Low Clans"
    ];

    ctrl.clanList = [{
        id: 0, name: "Ahrimanes",
        filters: ["Sabbat", "All Bloodlines", "Dark Ages"],
        disciplines: ["Animalism", "Potence", "Spiritus"]
      },
      {
        id: 1, name: "Anda",
        filters: ["Independent", "All Bloodlines", "Dark Ages"],
        disciplines: ["Animalism", "Fortitude", "Protean"]
      },
      {
        id: 2, name: "Assamite",
        filters: ["Thirteen", "Independent", "All Clans",
          "Low Clans", "Dark Ages"
        ],
        disciplines: ["Celerity", "Obfuscate", "Quietus"]
      },
      {
        id: 3, name: "Baali",
        filters: ["Independent", "All Bloodlines", "Dark Ages"],
        disciplines: ["Daimonion", "Obfuscate", "Presence"]
      },
      {
        id: 4, name: "Blood Brothers",
        filters: ["Sabbat", "All Bloodlines"],
        disciplines: ["Fortitude", "Potence", "Sanguinus"]
      },
      {
        id: 5, name: "Brujah",
        filters: ["Thirteen", "Camarilla", "All Clans",
                  "Camarilla (clans only)", "High Clans", "Dark Ages"],
        disciplines: ["Celerity", "Potence", "Presence"]
      },
      {
        id: 6, name: "Caitiff",
        filters: ["All Clans", "Dark Ages"],
        disciplines: []
      }, {
        id: 7, name: "Cappadocian",
        filters: ["All Clans", "Dark Ages", "High Clans"],
        disciplines: ["Auspex", "Fortitude", "Necromancy"]
      },
      {
        id: 8, name: "Children of Osiris",
        filters: ["All Bloodlines", "Dark Ages"],
        disciplines: ["Bardo", "2 other disciplines learned from original clan"]
      },
      {
        id: 9, name: "Daughters of Cacophony",
        filters: ["All Bloodlines"],
        disciplines: ["Fortitude", "Melpominee", "Presence"]
      },
      {
        id: 10, name: "Followers of Set",
        filters: ["Thirteen", "Independent", "All Clans", "Dark Ages",
                  "Low Clans"],
        disciplines: ["Obfuscate", "Presence", "Serpentis"]
      },
      {
        id: 11, name: "Gargoyles",
        filters: ["All Bloodlines"],
        disciplines: ["Flight", "Fortitude", "Potence", "Visceratika"]
      },
      {
        id: 12, name: "Gangrel",
        filters: ["Thirteen", "Independent", "All Clans", "Low Clans",
                  "Dark Ages"],
        disciplines: ["Animalism", "Fortitude", "Protean"]
      },
      {
        id: 13, name: "Giovanni",
        filters: ["Thirteen", "Independent", "All Clans", "Dark Ages"],
        disciplines: ["Dominate", "Necromancy", "Potence"]
      },
      {
        id: 14, name: "Harbingers of Skulls",
        filters: ["Sabbat", "All Bloodlines"],
        disciplines: ["Auspex", "Fortitude", "Necromancy"]
      },
      {
        id: 15, name: "Kiasyd",
        filters: ["All Bloodlines", "Dark Ages"],
        disciplines: ["Dominate", "Obtenebration", "Mytherceria"]
      },
      {
        id: 16, name: "Lamia",
        filters: ["All Bloodlines", "Dark Ages"],
        disciplines: ["Fortitude", "Necromancy", "Potence"]
      },
      {
        id: 17, name: "Lasombra",
        filters: ["Thirteen", "Sabbat", "All Clans", "Sabbat (clans only)",
                  "Dark Ages", "High Clans"],
        disciplines: ["Dominate", "Obtenebration", "Potence"]
      },
      {
        id: 18, name: "Lhiannan",
        filters: ["Independent", "All Bloodlines", "Dark Ages"],
        disciplines: ["Animalism", "Ogham", "Presence"]
      },
      {
        id: 19, name: "Malkavian",
        filters: ["Thirteen", "Camarilla", "All Clans",
                  "Camarilla (clans only)", "Dark Ages", "Low Clans"],
        disciplines: ["Auspex", "Dementation", "Obfuscate"]
      },
      {
        id: 20, name: "Nagaraja",
        filters: ["All Bloodlines", "Dark Ages"],
        disciplines: ["Auspex", "Dominate", "Necromancy"]
      },
      {
        id: 21, name: "Noiad",
        filters: ["All Bloodlines", "Dark Ages"],
        disciplines: ["Animalism", "Auspex", "Protean"]
      },
      {
        id: 22, name: "Nosferatu",
        filters: ["Thirteen", "Camarilla", "All Clans",
                  "Camarilla (clans only)", "Dark Ages", "Low Clans"],
        disciplines: ["Animalism", "Obfuscate", "Potence"]
      },
      {
        id: 23, name: "Ravnos",
        filters: ["Thirteen", "Independent", "All Clans", "Dark Ages",
                  "Low Clans"],
        disciplines: ["Animalism", "Chimerstry", "Fortitude"]
      },
      {
        id: 24, name: "Salubri",
        filters: ["Independent", "All Clans", "Dark Ages"],
        disciplines: ["Auspex", "Fortitude", "Obeah", "Valeren"]
      },
      {
        id: 25, name: "Samedi",
        filters: ["All Bloodlines"],
        disciplines: ["Fortitude", "Obfuscate", "Thanatosis"]
      },
      {
        id: 26, name: "Toreador",
        filters: ["Thirteen", "Camarilla", "All Clans",
                  "Camarilla (clans only)", "Dark Ages", "High Clans"],
        disciplines: ["Auspex", "Celerity", "Presence"]
      },
      {
        id: 27, name: "Tremere",
        filters: ["Thirteen", "Camarilla", "All Clans",
                  "Camarilla (clans only)", "Dark Ages", "Low Clans"],
        disciplines: ["Auspex", "Dominate", "Thaumaturgy"]
      },
      {
        id: 28, name: "Tzimisce",
        filters: ["Thirteen", "Sabbat", "All Clans", "Sabbat (clans only)",
                  "Dark Ages", "High Clans"],
        disciplines: ["Animalism", "Auspex", "Vicissitude"]
      },
      {
        id: 29, name: "Ventrue",
        filters: ["Thirteen", "Camarilla", "All Clans",
                  "Camarilla (clans only)", "Dark Ages", "High Clans"],
        disciplines: ["Dominate", "Fortitude", "Presence"]
      }
    ];

    function filterClans(filter) {
      ctrl.filteredClanList = [];
      if (filter === 'All') {
        ctrl.filteredClanList = ctrl.clanList;
        return;
      }
      ctrl.clanList.forEach(function(clan) {
        if (clan.filters.includes(filter)) {
          ctrl.filteredClanList.push(clan);
        }
      })
      ctrl.selectedClan = ctrl.filteredClanList[0];
    };

    ctrl.filteredClanList = ctrl.clanList;
    ctrl.selectedClan = ctrl.filteredClanList[0];
    ctrl.selectedClanFilter = ctrl.clanFilters[0];

    $scope.setUClan = function(clan) {
      UglyService.setClan(clan);
    }

    $scope.setTerm = function(term) {
      TermIndexService.setTerm(term);
    }

  }
]);

app.directive('clandescription',
  function(TermIndexService, DescriptionsFactory, $compile) {
    var getTemplate = function(clan) {
      return DescriptionsFactory[clan];
    }
    return {
      restrict: 'E',
      controller: 'ClanController',
      controllerAs: 'clanCtrl',
      scope: {
        clan: '='
      },
      link: function(scope, element, attrs, ctrl) {
        scope.$watch('clan', function() {
          element.html(getTemplate(scope.clan)).show();
          $compile(element.contents())(scope);
        })
      }
    }
  });

app.directive('disciplineHtml', function($compile) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      scope.$watch(function() {
        return scope.$eval(attrs.disciplineHtml);
      }, function(value) {
        var htmlOutput = "";
        for (var i = 0; i < value.length; i++) {
          if (i != value.length - 1) {
            htmlOutput += "<termindex term='" + value[i] + "'>" + value[i] +
              "</termindex>,&nbsp;";
          } else {
            htmlOutput += "<termindex term='" + value[i] + "'>" + value[i] +
              "</termindex>";
          }
        }
        element.html(htmlOutput);
        $compile(element.contents())(scope);
      });
    }
  };
});
