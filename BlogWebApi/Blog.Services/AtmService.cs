using System.Collections.Generic;
using System.Linq;
using Blog.Common.Exceptions;

namespace Blog.Services
{
  public class AtmService
  {
    public static Dictionary<int, int> Withdraw(int? inputAmount)
    {
      var intervals = new[] {10, 20, 50, 100};
      var result = intervals.ToDictionary(k => k, v => 0);

      if (inputAmount == null)
        return new Dictionary<int, int>();

      if(inputAmount < 0)
        throw new InvalidArgumentException();
      
      if (inputAmount%10 != 0)
        throw new NoteUnavailableException();

      foreach (var interval in intervals.OrderByDescending(e => e))
      {
        var count = inputAmount/interval;
        inputAmount = inputAmount%interval;
        result[interval] = count.Value;
      }

      return result;
    }
  }
}
