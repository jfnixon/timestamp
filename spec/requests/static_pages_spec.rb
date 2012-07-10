require 'spec_helper'

describe "StaticPages" do
  describe "Home GET /static_pages/home" do
    it "should work" do
      get static_pages_home_path
      response.should have_content('TimeStamp')
    end
    
    it "should have the content 'TimeStamp'" do
      get static_pages_home_path
      response.status.should be(200)
    end
  end
end
