using System;
using Blog.Common.Exceptions;
using Blog.Services;
using Xunit;

namespace Blog.Atm.Test
{
  public class Atm
  {
    [Fact]
    public void Withdraw30()
    {
      var result = AtmService.Withdraw(30);
      Assert.True(result[20] == 1);
      Assert.True(result[10] == 1);
    }
    
    [Fact]
    public void Withdraw80()
    {
      var result = AtmService.Withdraw(80);
      Assert.True(result[50] == 1);
      Assert.True(result[20] == 1);
      Assert.True(result[10] == 1);
    }

    [Fact]
    public void Withdraw125()
    {
      Assert.Throws<NoteUnavailableException>(() => AtmService.Withdraw(125));
    }
    
    [Fact]
    public void WithdrawMinus130()
    {
      Assert.Throws<InvalidArgumentException>(() => AtmService.Withdraw(-130));
    }
    
    [Fact]
    public void WithdrawNull()
    {
      var result = AtmService.Withdraw(null);
      Assert.True(result.Count == 0);
    }
  }
}
