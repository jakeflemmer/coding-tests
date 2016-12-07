describe('COTA text parsing', function(text, outputJson) {

  it('must not get dates in wrong format', function (done) {
    var allDatesFormat = text.match(/\d{2}([\/.-])\d{2}\1\d{4}/g);
    var correctDatesFormat = text.match(/\d{2}([/])\d{2}\1\d{4}/g);
    if ( allDatesFormat && correctDatesFormat )
    {
      if ( allDatesFormat.length == correctDatesFormat.length ){
        done(); // all dates are in correct format
      }
    }else if ( ! allDatesFormat && ! correctDatesFormat ) {
      done(); // there are no dates
    }
  })

  it('must not have a date before 1900', function (done) {
    var d = new Date(1900,0,0);
    var dates = text.match(/\d{2}([/])\d{2}\1\d{4}/g);
    if ( dates )
    {
      var passed = true;
      for ( var i=0; i < dates.length; i++)
      {
        if ( Date.parse(dates[i]) < d )
        {
          passed = false;
        }
      }
      if ( passed ) done(); // all dates are after 1900
    }else{
      done();
    }
  })

  it('must not get a negative duration or a duration of more than 100 years', function (done) {
    if ( ( Number(outputJson.duration) < 0 ) || ( Number(outputJson.duration) > 1000*60*60*24*365*100) )
    {
    }else{
      done();
    }
  })

  it('must not have both male and female pronouns', function (done) {
    var m = new RegExp("\\b" + "he" + "\\b","gi");
    var f = new RegExp("\\b" + "she" + "\\b","gi");
    if ( m.test(text) && f.test(text) )
    {
    }else{
      done();
    }
  })

  it('must not have a positive sentiment if negative sentiments are present', function (done) {
    if( outputJson.sentiment == "negative")
    {
      var POSITIVE_SENTIMENTS = ["happy", "glad","jubilant","satisfied"];
      var passed = true;
      for ( var i=0; i <POSITIVE_SENTIMENTS.length; i++)
      {
        var regex = new RegExp("\\b" + POSITIVE_SENTIMENTS[i] + "\\b","gi");
        if( regex.test(text) ) {
          passed = false;
        }
      }
      if ( passed ) done();
    }
  })

  it('must not have a negative sentiment if positive sentiments are present', function (done) {
    if( outputJson.sentiment == "positive")
    {
      var NEGATIVE_SENTIMENTS = ["sad", "disappointed", "angry", "frustrated"];
      var passed = true;
      for ( var i=0; i <NEGATIVE_SENTIMENTS.length; i++)
      {
        var regex = new RegExp("\\b" + NEGATIVE_SENTIMENTS[i] + "\\b","gi");
        if( regex.test(text) ) {
          passed = false;
        }
      }
      if ( passed ) done();
    }
  })

})

